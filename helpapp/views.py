from django.shortcuts import render
import sys
from django.shortcuts import render
from django.http import HttpResponse
import json
from django.core import serializers
from .models import *
from django.http import JsonResponse
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from django.http import HttpResponseServerError
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.views.decorators.cache import cache_page
from .firestore import db
import json
from .ResponseModels.help import Help
from .ResponseModels.location import Location
from .ResponseModels.user import User
from .Providers.analysis import Analysis
from .Providers.google_maps import GoogleMaps
import uuid
import requests
import json


# Create your views here.
def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")


@csrf_exempt
@cache_page(60 * 15)
def analyze(request):
    # register user
    if request.method == 'POST':
        # enter your api key here

        # url variable store url

        json_data = json.loads(request.body)

        # user_id = str(uuid.uuid4())
        # doc_ref = db.collection(u'user').document()

        analysis = Analysis(description=json_data['description'])
        analysis_results = analysis.results()

        potential_causes = analysis_results['potential_causes']

        if analysis_results['is_danger']['is_danger']:
            potential_causes['is_danger'] = 'is_danger'
        if analysis_results['is_suicide']['is_suicide']:
            potential_causes['suicide'] = 'suicide'

        closest_three_facilities = GoogleMaps(
            location=json_data['location'], potential_causes=potential_causes).obtain_relevent_data()
        help_response = Help(analysis_results=analysis_results, description=json_data['description'], facilities=closest_three_facilities
                             )
        for key, value in potential_causes.items():
            collections = db.collection(
                'conflict_resources').document(key).get()
            help_response.resources.extend([{"name": name, "url": url, "type": key}
                                            for name, url in collections._data.items()])
        response = help_response.to_dict()
        # doc_ref.set(User(json_data['name'], user_id, json_data['location'], conflict.to_dict()).to_dict())
        return JsonResponse(response, safe=False)
